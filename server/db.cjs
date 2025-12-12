module.exports = {
    diagrams: [
        {
            id: '1',
            title: 'Первая диаграмма',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-20T14:45:00Z',
            nodes: [
                {
                    id: 'node_1',
                    type: 'RECTANGLE',
                    x: 100,
                    y: 150,
                    width: 200,
                    height: 100,
                    text: 'Начальный процесс'
                },
                {
                    id: 'node_2',
                    type: 'CIRCLE',
                    x: 400,
                    y: 150,
                    width: 120,
                    height: 120,
                    text: 'Решение'
                },
                {
                    id: 'node_3',
                    type: 'RECTANGLE',
                    x: 700,
                    y: 150,
                    width: 200,
                    height: 100,
                    text: 'Конечный результат'
                }
            ],
            arrows: [
                {
                    id: 'arrow_1',
                    sourceId: 'node_1',
                    targetId: 'node_2',
                    type: 'DIRECTIONAL'
                },
                {
                    id: 'arrow_2',
                    sourceId: 'node_2',
                    targetId: 'node_3',
                    type: 'BIDIRECTIONAL'
                }
            ]
        },
        {
            id: '2',
            title: 'Архитектура системы',
            createdAt: '2024-02-01T09:15:00Z',
            updatedAt: '2024-02-10T16:20:00Z',
            nodes: [
                {
                    id: 'node_a',
                    type: 'RECTANGLE',
                    x: 50,
                    y: 50,
                    width: 180,
                    height: 80,
                    text: 'Клиент'
                },
                {
                    id: 'node_b',
                    type: 'RECTANGLE',
                    x: 300,
                    y: 50,
                    width: 180,
                    height: 80,
                    text: 'API Gateway'
                },
                {
                    id: 'node_c',
                    type: 'CIRCLE',
                    x: 550,
                    y: 50,
                    width: 100,
                    height: 100,
                    text: 'Сервис А'
                },
                {
                    id: 'node_d',
                    type: 'CIRCLE',
                    x: 550,
                    y: 200,
                    width: 100,
                    height: 100,
                    text: 'Сервис Б'
                }
            ],
            arrows: [
                {
                    id: 'arrow_a',
                    sourceId: 'node_a',
                    targetId: 'node_b',
                    type: 'DIRECTIONAL'
                },
                {
                    id: 'arrow_b',
                    sourceId: 'node_b',
                    targetId: 'node_c',
                    type: 'DIRECTIONAL'
                },
                {
                    id: 'arrow_c',
                    sourceId: 'node_b',
                    targetId: 'node_d',
                    type: 'DIRECTIONAL'
                },
                {
                    id: 'arrow_d',
                    sourceId: 'node_c',
                    targetId: 'node_d',
                    type: 'NONE'
                }
            ]
        }
    ]
};

//todo сделать кнопку сохранения на сервер и виджет выбора диаграмм
//  то есть локально можно работать с одной диаграммой офлайн
//  а на сервере сохраняться все диаграммы