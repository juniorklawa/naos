/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import os from 'os';
import smalltalk from 'smalltalk';
import go from '../../assets/windowsIcons/290.png';
import newFile from '../../assets/8.ico';
import folderOpen from '../../assets/23.ico';
import back from '../../assets/windowsIcons/back.png';
import { Container } from './styles';

const Files = () => {
  const [info, setInfo] = useState(null);

  const getFileIcon = (file: any) => {
    if (file.isDirectory) {
      return folderOpen;
    }

    return newFile;
  };

  const getInfo = async () => {
    // get all files from home folder but not subfolders and not hidden files
    const home = os.homedir();

    const files = fs.readdirSync(home, { withFileTypes: true });

    const filesData = files.map((file) => {
      const filePath = path.join(home, file.name);
      const stats = fs.statSync(filePath);
      return {
        name: file.name,
        path: filePath,
        isDirectory: file.isDirectory(),
        size: stats.size,
        birthtime: stats.birthtime,
        extension: path.extname(filePath),
      };
    });

    const formattedList = filesData.filter(
      (item: any) => !/(^|\/)\.[^/.]/g.test(item.name)
    );

    const currentDirectoryPath = home;

    setInfo({
      currentDirectoryPath,
      files: formattedList,
    });
  };

  const createNewFile = () => {
    // open a prompt to create a new file
    // create a new file in the current directory
    // refresh the list

    const prompt = require('electron-prompt');

    prompt({
      title: 'Prompt example',
      label: 'URL:',
      value: 'http://example.org',
      inputAttrs: {
        type: 'url',
      },
      type: 'input',
    })
      .then((r) => {
        if (r === null) {
          console.log('user cancelled');
        } else {
          console.log('result', r);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Container>
      <section className="com__function_bar">
        <div className="com__function_bar__button">
          <img className="com__function_bar__icon" src={back} alt="" />
          <span className="com__function_bar__text">Back</span>
        </div>
        <div className="com__function_bar__separate" />
        <div onClick={createNewFile} className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize "
            src={newFile}
            alt=""
          />
          <span className="com__function_bar__text">Novo Arquivo</span>
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img
            className="com__function_bar__icon--normalize"
            src={folderOpen}
            alt=""
          />
          <span className="com__function_bar__text">Nova Pasta</span>
        </div>
        <div className="com__function_bar__separate" />
      </section>

      <section className="com__address_bar">
        <div className="com__address_bar__title">Caminho</div>
        <div className="com__address_bar__content">
          <div className="com__address_bar__content__text">
            {info?.currentDirectoryPath}
          </div>
        </div>
        <div className="com__address_bar__go">
          <img className="com__address_bar__go__img" src={go} alt="go" />
          <span className="com__address_bar__go__text">Go</span>
        </div>
      </section>
      <div style={{ backgroundColor: 'white' }} className="com__content">
        <div className="com__content__inner">
          <div className="com__content__right__card">
            <div className="com__content__right__card__content">
              {info?.files?.map((file: any) => (
                <div
                  key={file?.path}
                  className="com__content__right__card__item"
                >
                  <img
                    className="com__content__right__card__item__icon"
                    src={getFileIcon(file)}
                    alt=""
                  />

                  <div className="com__content__right__card__item__name">
                    {file?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Files;
