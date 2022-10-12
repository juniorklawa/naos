/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import si from 'systeminformation';
import { Container } from './styles';

const Processes = () => {
  const [info, setInfo] = useState(null);

  const getInfo = async () => {
    const processesData = await si.processes();

    setInfo({
      processes: processesData,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getInfo();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
                Processos: {info?.processes?.all}
              </div>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: 'Tahoma, Geneva, sans-serif',
                }}
              >
                <tr
                  style={{
                    borderBottom: '1px solid #ccc',
                    fontFamily: 'Tahoma, Geneva, sans-serif',
                  }}
                >
                  <th
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                    }}
                  >
                    Nome
                  </th>
                  <th
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                    }}
                  >
                    PID
                  </th>
                  <th
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                    }}
                  >
                    Prioridade
                  </th>
                  <th
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                    }}
                  >
                    Usuário
                  </th>
                  <th
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                    }}
                  >
                    Estado
                  </th>
                  <th
                    style={{
                      padding: 10,
                      textAlign: 'left',
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                    }}
                  >
                    Iniciado
                  </th>
                </tr>
                {info?.processes.list.map((process: any) => (
                  <tr
                    key={process.pid}
                    style={{
                      borderBottom: '1px solid #ccc',
                      fontFamily: 'Tahoma, Geneva, sans-serif',
                    }}
                  >
                    <td
                      style={{
                        padding: 10,
                        textAlign: 'left',
                        fontFamily: 'Tahoma, Geneva, sans-serif',
                      }}
                    >
                      {process.name}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        textAlign: 'left',
                        fontFamily: 'Tahoma, Geneva, sans-serif',
                      }}
                    >
                      {process.pid}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        textAlign: 'left',
                        fontFamily: 'Tahoma, Geneva, sans-serif',
                      }}
                    >
                      {process.priority}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        textAlign: 'left',
                        fontFamily: 'Tahoma, Geneva, sans-serif',
                      }}
                    >
                      {process.user}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        textAlign: 'left',
                        fontFamily: 'Tahoma, Geneva, sans-serif',
                      }}
                    >
                      {process.state}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        textAlign: 'left',
                        fontFamily: 'Tahoma, Geneva, sans-serif',
                      }}
                    >
                      {process.started}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Processes;
