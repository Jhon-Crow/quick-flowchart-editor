module.exports = {
    printWidth: 80, // Максимальное количество символов в строке
    singleQuote: true, // Использовать одинарные кавычки
    trailingComma: 'es5', // Запятые в конце объектов и массивов
    tabWidth: 4, // Размер табуляции
    semi: true, // Точка с запятой в конце выражений

    // Форматирование объектов и массивов
    bracketSpacing: true, // Пробелы между скобками { foo: bar }
    bracketSameLine: false, // Закрывающую скобку переносить на новую строку

    // Настройки для JSX
    jsxSingleQuote: true, // Двойные кавычки в JSX
    arrowParens: 'avoid', // Избегать оборачивать аргументы стрелочных функций в скобки

    // Правила переноса
    proseWrap: 'never', // Не переносить markdown текст
}