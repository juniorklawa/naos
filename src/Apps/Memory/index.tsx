/* eslint-disable @typescript-eslint/no-explicit-any */
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

const Memory = () => {
  const [info, setInfo] = useState(null);

  const getInfo = async () => {
    const cpuData = await si.cpu();
    const osData = await si.osInfo();
    const graphicsData = await si.graphics();

    const diskData = await si.diskLayout();
    const memData = await si.mem();

    setInfo({
      cpu: cpuData,
      os: osData,
      graphics: graphicsData,
      disk: diskData,
      mem: memData,
    });
  };

  const convertBytes = (bytes: number) => {
    if (!bytes) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  useEffect(() => {
    getInfo();
  }, []);

  const [chartData, setChardData] = useState<any>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const cpuData = await si.cpu();
      const osData = await si.osInfo();
      const graphicsData = await si.graphics();

      const diskData = await si.diskLayout();
      const memData = await si.mem();

      const datInfo = {
        cpu: cpuData,
        os: osData,
        graphics: graphicsData,
        disk: diskData,
        mem: memData,
      };

      console.log(memData);

      setInfo(datInfo);

      // kb to mb

      const newData = {
        name: '',
        active: (memData.active / 1024 / 1024).toFixed(4),
        available: (memData.available / 1024 / 1024).toFixed(4),
        free: (memData.free / 1024 / 1024).toFixed(4),
        used: (memData.used / 1024 / 1024).toFixed(4),
        cached: (memData.cached / 1024 / 1024).toFixed(4),
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
              <div style={{ height: 8 }} />
              <div
                style={{
                  fontSize: 16,
                }}
                className="com__content__right__card__header"
              >
                Informações sobre os discos
              </div>
              <div style={{ height: 16 }} />
              {info?.disk.map((disk: any) => (
                <div key={disk.serialNum}>
                  <div className="com__content__right__card__header">
                    {disk.name}
                  </div>
                  <div className="com__content__right__card__content">
                    <div className="com__content__right__card__item">
                      <div className="com__content__right__card__text">
                        Caminho: {disk?.device}
                      </div>
                    </div>
                    <div className="com__content__right__card__item">
                      <div className="com__content__right__card__text">
                        Interface: {disk?.interfaceType}
                      </div>
                    </div>
                    <div className="com__content__right__card__item">
                      <div className="com__content__right__card__text">
                        Capacidade: {convertBytes(disk?.size)}
                      </div>
                    </div>
                    <div className="com__content__right__card__item">
                      <div className="com__content__right__card__text">
                        Serial: {disk.serialNum}
                      </div>
                    </div>
                    <div className="com__content__right__card__item">
                      <div className="com__content__right__card__text">
                        Tipo: {disk.type}
                      </div>
                    </div>
                    <div className="com__content__right__card__item">
                      <div className="com__content__right__card__text">
                        Fornecedor: {disk.vendor}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="com__content__right__card">
              <div
                style={{
                  fontSize: 16,
                }}
                className="com__content__right__card__header"
              >
                Informações sobre a Memória
              </div>
              <div className="com__content__right__card__content">
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Total: {convertBytes(info?.mem?.total)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Livre: {convertBytes(info?.mem?.free)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Em uso: {convertBytes(info?.mem?.used)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Ativa: {convertBytes(info?.mem?.active)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Disponível: {convertBytes(info?.mem?.disponivel)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Buffers: {convertBytes(info?.mem?.buffers)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Em cache: {convertBytes(info?.mem?.cached)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Total Swap: {convertBytes(info?.mem?.swapTotal)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Swap usada: {convertBytes(info?.mem?.swapused)}
                  </div>
                </div>
                <div className="com__content__right__card__item">
                  <div className="com__content__right__card__text">
                    Swap Livre: {convertBytes(info?.mem?.swapfree)}
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
                    dataKey="active"
                    name="Memória ativa (MB)"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="available"
                    name="Memória disponível (MB)"
                    stroke="#82ca9d"
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="free"
                    name="Memória livre (MB)"
                    stroke="#1A237E"
                  />

                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="used"
                    name="Memória usada (MB)"
                    stroke="#AD1457"
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="cached"
                    name="Memória em cache (MB)"
                    stroke="#4E342E"
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

export default Memory;
