import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { exec } from "child_process";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const execAsync = (command: string): Promise<{ stdout: string, stderr: string }> => {
  return new Promise((resolve) => {
    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ stdout, stderr: stderr || error.message });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const { language, sourceCode } = await req.json();

    if (!language || !sourceCode) {
      return NextResponse.json({ error: "Language and source code are required." }, { status: 400 });
    }

    const langMap: Record<string, string> = {
      javascript: "nodejs-20.17.0",
      typescript: "typescript-5.6.2",
      python: "cpython-3.10.15",
      java: "openjdk-jdk-21+35",
      cpp: "gcc-13.2.0",
    };

    const compiler = langMap[language.toLowerCase()];
    if (!compiler) {
      return NextResponse.json({ error: `Language ${language} is not supported.` }, { status: 400 });
    }

    // 1. Try primary execution API (Wandbox)
    try {
      const response = await axios.post("https://wandbox.org/api/compile.json", {
        compiler: compiler,
        code: sourceCode
      }, { timeout: 8000 });

      const data = response.data;
      return NextResponse.json({
        run: {
          stdout: data.program_message || data.compiler_message || "",
          stderr: data.program_error || data.compiler_error || "",
          code: data.status === "0" ? 0 : 1
        }
      });
    } catch (err1) {
      // 2. Ultimate Fallback: Execute locally (only works on local machine)
      try {
        const timestamp = Date.now();
        let ext = ".txt";
        let cmd = "";
        
        if (language === "javascript") { ext = ".js"; cmd = "node"; }
        else if (language === "python") { ext = ".py"; cmd = "python"; }
        else {
          return NextResponse.json({ error: "Public API is down. Local fallback only supports JavaScript and Python currently." }, { status: 503 });
        }

        const filepath = join(tmpdir(), `codearena_${timestamp}${ext}`);
        await writeFile(filepath, sourceCode);
        
        const { stdout, stderr } = await execAsync(`${cmd} "${filepath}"`);
        
        await unlink(filepath).catch(() => {});

        return NextResponse.json({
          run: {
            stdout: stdout,
            stderr: stderr,
            code: stderr ? 1 : 0
          }
        });
      } catch (localErr: any) {
        return NextResponse.json(
          { error: "Public API failed, and Local Execution failed. Ensure Node/Python are installed.", details: localErr.message },
          { status: 503 }
        );
      }
    }

  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to execute code.", details: error.message },
      { status: 500 }
    );
  }
}
