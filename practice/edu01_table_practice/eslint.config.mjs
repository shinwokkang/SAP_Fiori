import fioriTools from '@sap-ux/eslint-plugin-fiori-tools';

export default [
    ...fioriTools.configs.recommended,
    {
        files: ['webapp/controller/**/*.js'],
        // 수업 실습의 alert와 console 출력은 유지하고 경고로 확인합니다.
        rules: {
            'no-alert': 'warn',
            'no-console': 'warn'
        }
    }
];
