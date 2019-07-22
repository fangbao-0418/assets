import React from 'react';
import NoPage from './404';
import NoAccess from './NoAccess';
interface Props {
    type?: 'no-page' | 'no-access';
}
declare class Main extends React.Component<Props> {
    static NoPage: typeof NoPage;
    static NoAccess: typeof NoAccess;
    render(): JSX.Element;
}
export default Main;
