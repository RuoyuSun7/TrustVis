import { spawn } from 'child_process';

export default async function Page() {
  const pythonProcess = spawn('python', ['../python/hello.py', 'arg1', 'arg2']);


  let dataToSend = '';
  for await (const data of pythonProcess.stdout) {
    dataToSend += data.toString();
  }
  console.log(dataToSend);

  // return res.status(200).json({ message: dataToSend });
}