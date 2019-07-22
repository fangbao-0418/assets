import React from 'react';
interface Props {
    onOk?: () => void;
}
interface State {
    type: number;
    error: any;
    message: string;
}
declare class Main extends React.Component<Props> {
    state: State;
    values: any;
    verify: any;
    num: number;
    componentDidMount(): void;
    changeType(type: number): void;
    toLogin(): void;
    handleChange(field: 'phone' | 'verify-code' | 'sms-verify-code', e: React.SyntheticEvent): void;
    getSmsVerifyCode(): void;
    render(): JSX.Element;
}
export default Main;
