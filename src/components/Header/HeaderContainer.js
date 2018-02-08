import { connect } from 'react-redux';
import Header from "./Header";

const mapStateToProps = (state) => {
    //console.log('Inside HeaderContainer.mapStateToProps', state);
    return {
        pageHeader: state.commonApp.setPageHeader
    };
};

const HeaderContainer = connect(
    mapStateToProps)(Header);

export default HeaderContainer;

