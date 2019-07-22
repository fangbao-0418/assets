import React from 'react';
import { UserProps } from '../iframe/ContextType';
interface Props {
    user: UserProps;
    onChange?: () => void;
}
interface State {
    msgCount: number;
    collapsed: boolean;
    companyList: Array<{
        companyName: string;
        companyId: string;
    }>;
}
declare class Main extends React.Component<Props, State> {
    msg: any;
    state: State;
    componentDidMount(): void;
    toggle: () => void;
    switchCompany(code: string, onChange: () => void): void;
    history(url: string): void;
    getMenu(onChange: () => void): JSX.Element;
    render(): JSX.Element;
}
export default Main;
