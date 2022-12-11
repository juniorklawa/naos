import React, { useEffect, useState } from 'react';
import si from 'systeminformation';
import { Container } from './styles';

const System = () => {
  const [info, setInfo] = useState(null);

  const getInfo = async () => {
    const cpuData = await si.cpu();
    const osData = await si.osInfo();
    const graphicsData = await si.graphics();
    setInfo({
      cpu: cpuData,
      os: osData,
      graphics: graphicsData,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const [time, setTime] = useState('');

  const getTime = () => {
    const ms = si.time().current;

    const date = new Date(ms);

    const hours = date.getHours();
    const seconds = date.getSeconds();

    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    const hoursString = hours < 10 ? `0${hours}` : hours;

    const minutes = date.getMinutes();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;

    const period = hours < 12 ? 'AM' : 'PM';

    const formattedTime = `${hoursString}:${minutesString}:${secondsString} ${period}`;

    setTime(formattedTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
      getInfo();
      console.log('teste');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div className="com__content">
        <div className="com__content__inner">
          <div className="com__content__right">
            <div className="com__content__right__card">
              <div style={{ height: 16 }} />
              <div
                style={{
                  fontSize: 16,
                }}
                className="com__content__right__card__header"
              >
                Informações sobre o Sistema Operacional {time}
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Plataforma: {info?.os.platform}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Arquitetura: {info?.os.arch}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Distro: {info?.os?.distro}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Hostname: {info?.os?.hostname}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Kernel: {info?.os?.kernel}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Release: {info?.os?.release}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Serial: {info?.os?.serial}
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card">
              <div
                style={{
                  fontSize: 16,
                }}
                className="com__content__right__card__header"
              >
                Informações sobre o Processador
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Marca: {info?.cpu?.brand}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Núcleos: {info?.cpu?.cores}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Fabricante: {info?.cpu?.manufacturer}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Modelo: {info?.cpu?.model}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Núcleos físicos: {info?.cpu?.physicalCores}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Familia: {info?.cpu?.physicalCores}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Velocidade atual: {info?.cpu?.speed}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Velocidade máxima: {info?.cpu?.speedMax}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Velocidade mínima: {info?.cpu?.speedMin}
                  </div>
                </div>
              </div>
            </div>
            <div className="com__content__right__card">
              <div
                style={{
                  fontSize: 16,
                }}
                className="com__content__right__card__header"
              >
                Informações sobre Controladores Gráficos
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Endereço: {info?.graphics?.controllers[0]?.busAddress}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Modelo: {info?.graphics?.controllers[0]?.model}
                  </div>
                </div>

                <div>
                  <div className="com__content__right__card__text">
                    Fornecedor: {info?.graphics?.controllers[0]?.vendor}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default System;
