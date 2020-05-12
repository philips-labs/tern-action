import * as core from '@actions/core';
import { exec } from '@actions/exec';

export const tern = async () => {
  const image = core.getInput('image', { required: true });
  const outputDirectory = core.getInput('output-directory', { required: false });
  const path = outputDirectory; 
  
  core.setOutput("path", path);

  const ternCommands: string[] = [
    `git clone https://github.com/tern-tools/tern.git`,
    `docker build . --file tern/Dockerfile --tag ternd`,
    `./tern/docker_run.sh workdir ternd "report -f json -i ${image}" > ${outputDirectory}/${image}.txt`,
  ];

  core.info(`
    Using Configuration:

    image             : ${image}
    outputDirectory   : ${outputDirectory}
    path              : ${path}
  `);

  core.startGroup('Running tern scan');
  core.debug(
    `Running tern with the following commands: ${ternCommands.join(', ')}`,
  );

  for (let index in ternCommands) {
    const errorCode = await exec(ternCommands[index]);
    if (errorCode === 1 ) {
      core.setFailed('Tern scan failed.');
      throw new Error('Tern scan failed');
    }
  }
  core.endGroup();
};
