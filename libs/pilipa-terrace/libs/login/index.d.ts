import React from 'react';
interface State {
    step: 1 | 2;
}
declare class Main extends React.Component {
    state: State;
    componentWillReceiveProps(): void;
    render(): JSX.Element;
}
export default Main;
