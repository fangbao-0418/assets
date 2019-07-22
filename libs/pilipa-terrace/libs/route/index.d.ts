import React from 'react';
import { RouteProps } from 'react-router';
interface Props extends RouteProps {
    hidden?: boolean;
}
declare class Main extends React.Component<Props> {
    render(): JSX.Element;
}
export default Main;
