/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import os from 'os';
import go from '../../assets/windowsIcons/290.png';
import newFile from '../../assets/8.ico';
import folderOpen from '../../assets/23.ico';
import back from '../../assets/windowsIcons/back.png';
import { Container } from './styles';

const Files = () => {
  const [info, setInfo] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');

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
    setIsModalActive(true);
    // open a prompt to create a new file
    // create a new file in the current directory
    // refresh the list
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
                  onClick={() => setSelectedIcon(file.path)}
                  onDoubleClick={() => {
                    if (file.isDirectory) {
                      getInfo(file.path);
                    }
                  }}
                  key={file?.path}
                  style={{
                    cursor: file.isDirectory ? 'pointer' : 'default',
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
              width: '400px',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
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
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginLeft: '20px',
                }}
              >
                Criar novo arquivo
              </div>
              <div
                onClick={() => setIsModalActive(false)}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'red',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginRight: '20px',
                }}
              >
                X
              </div>
            </div>
            <div className="com__modal__content__body">
              <div className="com__modal__content__body__input">
                <div className="com__modal__content__body__input__title">
                  Nome do arquivo
                </div>
                <input
                  className="com__modal__content__body__input__input"
                  type="text"
                />
              </div>
            </div>

            <button
              onClick={() => setIsModalActive(false)}
              style={{
                width: '100px',
                height: '40px',
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
