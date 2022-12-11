import React, { useEffect, useState } from 'react';
import si from 'systeminformation';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Container } from './styles';

const System = () => {
  const [info, setInfo] = useState(null);

  const getInfo = async () => {
    const cpuData = await si.cpu();
    const osData = await si.osInfo();
    const graphicsData = await si.graphics();

    const datInfo = {
      cpu: cpuData,
      os: osData,
      graphics: graphicsData,
    };

    setInfo(datInfo);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const [time, setTime] = useState('');

  const [chartData, setChardData] = useState<any>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const cpuData = await si.cpu();
      const osData = await si.osInfo();
      const graphicsData = await si.graphics();

      const datInfo = {
        cpu: cpuData,
        os: osData,
        graphics: graphicsData,
      };

      setInfo(datInfo);

      const newData = {
        name: '',
        cpuSpeed: cpuData.speed,
        gpuTemp: graphicsData.controllers[0].temperatureGpu,
        gpuFree: (graphicsData.controllers[0].memoryFree / 1024).toFixed(4),
        gpuUsed: (graphicsData.controllers[0].memoryUsed / 1024).toFixed(4),
      };

      const updatedData = [
        ...chartData.map((i: any) => ({
          ...i,
          name: '',
        })),
        newData,
      ];

      // only keep the last 5 data points
      updatedData.splice(0, updatedData.length - 5);

      // the last data point is the current time
      updatedData[
        updatedData.length - 1
      ].name = new Date().toLocaleTimeString();

      setChardData(updatedData);
    }, 1000);
    return () => clearInterval(interval);
  }, [chartData]);

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
            <div className="com__content__right__card">
              <div
                style={{
                  fontSize: 16,
                }}
                className="com__content__right__card__header"
              >
                Monitor
              </div>
              <div className="com__content__right__card__content">
                <LineChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="cpuSpeed"
                    name="Velocidade CPU (GHz)"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="gpuTemp"
                    name="Temperatura GPU (°C)"
                    stroke="#82ca9d"
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="gpuFree"
                    name="Memória livre GPU (GB)"
                    stroke="#1A237E"
                  />

                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="gpuUsed"
                    name="Memória usada GPU (GB)"
                    stroke="#AD1457"
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default System;
