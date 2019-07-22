import React from 'react';
import PropTypes from 'prop-types';
interface Props {
    hidden: boolean;
    title: React.ReactNode;
    onTitleClick: () => void;
}
declare class Main extends React.Component<Props> {
    static contextTypes: {
        openKeys: PropTypes.Requireable<any[]>;
        selectedKeys: PropTypes.Requireable<any[]>;
    };
    _reactInternalFiber: {
        key: string;
    };
    onTitleClick(): void;
    render(): JSX.Element;
}
export default Main;
