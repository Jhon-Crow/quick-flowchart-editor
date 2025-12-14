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
            ]
        },
    ]
};
//todo сделать чтоб не падала бд при пустом ключе
//todo сделать кнопку сохранения на сервер и виджет выбора диаграмм
//  то есть локально можно работать с одной диаграммой офлайн
//  а на сервере сохраняться все диаграммы