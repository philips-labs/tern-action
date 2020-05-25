import * as core from '@actions/core';
import { exec, ExecOptions } from '@actions/exec';
import { writeFile } from 'fs';

export const tern = async () => {
  core.startGroup('Check inputs');

  const image = core.getInput('image', { required: true });

  const outputFormat = core.getInput('format', { required: true });
  let outputFile = core.getInput('output', { required: false });
  
  const allFormats: string[] = [
    'json',
    'spdx',
    'human'
  ]

  if (!allFormats.includes(outputFormat)) {
      core.setFailed('Tern scan failed.');
      throw new Error('Tern scan failed');
  }

  if (!outputFile) {
    outputFile = `tern.${outputFormat}`;
  }

  core.info(`
    Using Configuration:

    image             : ${image}
    outputFormat      : ${outputFormat}
    outputFile        : ${outputFile}
  `);
  core.endGroup();

  core.startGroup('prepare tern environment');

  const prepareCommands: string[] = [
    `git clone https://github.com/tern-tools/tern.git`,
    `docker build . --file tern/Dockerfile --tag ternd`,
  ];

  for (let index in prepareCommands) {
    const errorCode = await exec(prepareCommands[index]);
    if (errorCode === 1 ) {
      core.setFailed('Tern scan failed.');
      throw new Error('Tern scan failed');
    }
  }
  core.endGroup();

  core.startGroup('Running tern scan');
  
  const ternCommands: string[] = [
    `./tern/docker_run.sh workdir ternd "report -f ${outputFormat} -i ${image}"`,
  ];

  core.debug(
    `Running tern with the following commands: ${ternCommands.join(', ')}`,
  );

  let myOutput = '';
  const options: ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        myOutput += data.toString();
      },
    }
  };
  
  for (let index in ternCommands) {
    const errorCode = await exec(ternCommands[index], [], options);
    if (errorCode === 1 ) {
      core.setFailed('Tern scan failed.');
      throw new Error('Tern scan failed');
    }
  }
  core.endGroup();

  core.startGroup('Save output');
  await writeFile(outputFile, myOutput, (err) => {
    if (err) {
        core.setFailed(`Write ${outputFile} failed`);
        throw new Error(`Write ${outputFile} failed`);
     }
     core.info(
       `Ouput written to ${outputFile}`
     );
  });
  core.endGroup();

  core.startGroup('collection output');
  core.setOutput('output', myOutput);
  core.setOutput('file', outputFile);
  core.endGroup();
};
