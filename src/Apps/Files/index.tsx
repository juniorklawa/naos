/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import os from 'os';
import child_process from 'child_process';
import go from '../../assets/windowsIcons/290.png';
import newFile from '../../assets/8.ico';
import folderOpen from '../../assets/23.ico';
import back from '../../assets/windowsIcons/back.png';
import { Container } from './styles';

const Files = () => {
  const [info, setInfo] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [name, setName] = useState('');
  const [selectedCreate, setSelectedCreate] = useState<'file' | 'directory'>(
    'file'
  );

  const getFileIcon = (file: any) => {
    if (file.isDirectory) {
      return folderOpen;
    }

    return newFile;
  };

  const getInfo = async (dirPath?: string) => {
    // get all files from home folder but not subfolders and not hidden files

    const home = os.homedir();

    const files = fs.readdirSync(home, { withFileTypes: true });

    if (dirPath) {
      const dirFiles = fs.readdirSync(dirPath, { withFileTypes: true });

      const formattedList = dirFiles.map((file) => {
        const filePath = path.join(dirPath, file.name);
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

      const filteredList = formattedList.filter(
        (item: any) => !/(^|\/)\.[^/.]/g.test(item.name)
      );

      setInfo({
        files: filteredList,
        currentDirectoryPath: dirPath,
      });

      return;
    }

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

  const goBack = () => {
    const { currentDirectoryPath } = info;

    const parentDirectory = path.dirname(currentDirectoryPath);

    getInfo(parentDirectory);
    setSelectedIcon('');
  };

  const createNewFile = () => {
    if (!name) {
      return;
    }

    const { currentDirectoryPath } = info;

    const filePath = path.join(currentDirectoryPath, name);

    fs.writeFileSync(filePath, '');

    getInfo(currentDirectoryPath);

    setName('');

    setIsModalActive(false);
  };

  const createNewFolder = () => {
    if (!name) {
      return;
    }

    const { currentDirectoryPath } = info;

    const dirPath = path.join(currentDirectoryPath, name);

    fs.mkdirSync(dirPath);

    getInfo(currentDirectoryPath);

    setName('');

    setIsModalActive(false);
  };

  const openFile = (filePath: string) => {
    if (process.platform === 'linux') {
      const { exec } = child_process;
      // print error
      exec(`xdg-open ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }

    if (process.platform === 'win32') {
      const { exec } = child_process;
      exec(`start ${filePath}`);
    }

    if (process.platform === 'darwin') {
      const { exec } = child_process;
      exec(`open ${filePath}`);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Container>
      <section className="com__function_bar">
        <div onClick={() => goBack()} className="com__function_bar__button">
          <img className="com__function_bar__icon" src={back} alt="" />
          <span className="com__function_bar__text">Back</span>
        </div>
        <div className="com__function_bar__separate" />
        <div
          onClick={() => {
            setSelectedCreate('file');
            setIsModalActive(true);
          }}
          className="com__function_bar__button"
        >
          <img
            className="com__function_bar__icon--normalize "
            src={newFile}
            alt=""
          />
          <span className="com__function_bar__text">Novo Arquivo</span>
        </div>
        <div className="com__function_bar__separate" />
        <div
          onClick={() => {
            setSelectedCreate('directory');
            setIsModalActive(true);
          }}
          className="com__function_bar__button"
        >
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
                  onClick={() => setSelectedIcon(file.path)}
                  onDoubleClick={() => {
                    if (file.isDirectory) {
                      getInfo(file.path);
                      return;
                    }

                    openFile(file.path);
                  }}
                  key={file?.path}
                  style={{
                    cursor: 'pointer',
                    filter:
                      selectedIcon === file?.path
                        ? 'drop-shadow(blue 0px 0px)'
                        : 'none',
                  }}
                  className="com__content__right__card__item"
                >
                  <img
                    className="com__content__right__card__item__icon"
                    src={getFileIcon(file)}
                    style={{
                      opacity: selectedIcon === file?.path ? 0.5 : 1,
                    }}
                    alt=""
                  />

                  <div
                    style={{
                      backgroundColor:
                        selectedIcon === file?.path
                          ? 'rgba(0, 0, 255, 0.5)'
                          : 'transparent',
                      color: selectedIcon === file?.path ? 'white' : 'black',
                      fontSize: 13,
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                      padding: '4px 4px',
                    }}
                    className="com__content__right__card__item__name"
                  >
                    {file?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  fontFamily: 'Tahoma, Geneva, sans-serif',
                }}
              >
                {selectedCreate === 'file' ? 'Novo Arquivo' : 'Nova Pasta'}
              </div>
              <div
                onClick={() => setIsModalActive(false)}
                style={{
                  width: '20px',
                  height: '20px',
                  marginLeft: '8px',
                  backgroundColor: '#D32F2F',
                  color: '#ffffff',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'Tahoma, Geneva, sans-serif',
                  cursor: 'pointer',
                }}
              >
                X
              </div>
            </div>
            <div className="com__modal__content__body">
              <div className="com__modal__content__body__input">
                <div
                  style={{
                    fontFamily: 'Tahoma, Geneva, sans-serif',
                    marginTop: '8px',
                  }}
                >
                  {selectedCreate === 'file'
                    ? 'Nome do Arquivo'
                    : 'Nome da Pasta'}
                </div>
                <input
                  className="com__modal__content__body__input__input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (selectedCreate === 'file') {
                  createNewFile();
                  return;
                }

                createNewFolder();
              }}
              style={{
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#3F51B5',
                color: '#ffffff',
                fontWeight: 'bold',
                fontFamily: 'Tahoma, Geneva, sans-serif',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Criar
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Files;
