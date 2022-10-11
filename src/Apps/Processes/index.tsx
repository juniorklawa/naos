import React, { useEffect, useState } from 'react';
import si from 'systeminformation';
import { Container } from './styles';

const Processes = () => {
  const [info, setInfo] = useState(null);

  const getInfo = async () => {
    const cpuData = await si.cpu();
    const osData = await si.osInfo();
    const graphicsData = await si.graphics();

    si.processes().then((data) => console.log(data));

    setInfo({
      cpu: cpuData,
      os: osData,
      graphics: graphicsData,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Container>
      <div className="com__content">
        <div className="com__content__inner">
          <div className="com__content__right">
            <div className="com__content__right__card">
              <div
                style={{
                  fontSize: 16,
                }}
                className="com__content__right__card__header"
              >
                Informações sobre o Sistema Operacional
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

export default Processes;
