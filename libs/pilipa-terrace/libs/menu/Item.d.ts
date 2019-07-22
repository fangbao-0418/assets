import React from 'react';
import PropTypes from 'prop-types';
interface Props {
    hidden: boolean;
    onClick: () => void;
}
declare class Main extends React.Component<Props> {
    static contextTypes: {
        openKeys: PropTypes.Requireable<any[]>;
        selectedKeys: PropTypes.Requireable<any[]>;
    };
    _reactInternalFiber: {
        key: string;
    };
    handleClick(): void;
    render(): JSX.Element;
}
export default Main;
