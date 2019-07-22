import React from 'react';
interface States {
    dataSource: Array<{
        companyName: string;
        companyId: string;
    }>;
}
declare class Main extends React.Component {
    state: States;
    componentWillMount(): void;
    history(url?: string): void;
    render(): JSX.Element;
}
export default Main;
