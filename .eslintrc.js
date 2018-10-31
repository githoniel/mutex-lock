module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        node: true,
        'jest/globals': true
    },
    plugins: ['jest'],
    extends: 'airbnb-base',
    'rules': {
        'class-methods-use-this': 0,
        'no-await-in-loop': 0,
        'no-underscore-dangle': 0,
        'max-len': [1, 120, 2, {
            ignoreComments: true
        }],
        'no-new': 0,
        'semi': [2, 'never'],
        'no-console': 0,
        'no-param-reassign': [2, {
            'props': false
        }],
        'no-use-before-define': [2, {
            'functions': false
        }],
        'no-plusplus': [1, {
            'allowForLoopAfterthoughts': true
        }],
        'func-names': [2, 'as-needed'],
        'indent': ['error', 4],
        'linebreak-style': 0,
        'comma-dangle': 0,
        'no-bitwise': [2, {
            'int32Hint': true
        }],
        'default-case': 0,
        'consistent-return': 0,
        'eol-last': 0,
        'no-param-reassign': 0,
        'no-else-return': 0,
        'import/extensions': [2, 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        'quote-props': [2, 'consistent-as-needed'],
        'import/no-extraneous-dependencies': [
            'error',
            {
                'devDependencies': true
            }
        ],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
