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

    const langMap: Record<string, { language: string; version: string }> = {
      javascript: { language: "javascript", version: "18.15.0" },
      typescript: { language: "typescript", version: "5.0.3" },
      python: { language: "python", version: "3.10.0" },
      java: { language: "java", version: "15.0.2" },
      cpp: { language: "c++", version: "10.2.0" },
    };

    const runConfig = langMap[language.toLowerCase()];
    if (!runConfig) {
      return NextResponse.json({ error: `Language ${language} is not supported.` }, { status: 400 });
    }

    const payload = {
      language: runConfig.language,
      version: runConfig.version,
      files: [{ content: sourceCode }]
    };

    // 1. Try primary Piston endpoint (EMKC)
    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", payload, { timeout: 5000 });
      return NextResponse.json(response.data);
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
            { error: "Public APIs failed, and Local Execution failed. Ensure Node/Python are installed.", details: localErr.message },
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
