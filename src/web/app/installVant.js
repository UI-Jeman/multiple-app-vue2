import App from 'vue';
import {
    Button,
    Toast,
    Search,
    Cell,
    Popup,
    List,
    IndexBar,
    IndexAnchor,
    Tab,
    Tabs,
    Picker,
    Switch,
    DatetimePicker,
    PullRefresh 
} from 'vant';

const components = [
    Button,
    Toast,
    Search,
    Cell,
    Popup,
    List,
    IndexBar,
    IndexAnchor,
    Tab,
    Tabs,
    Picker,
    Switch,
    DatetimePicker,
    PullRefresh 
];

const install = function (app = App) {
    components.forEach(component => {
        app.use(component);
    });
    return app;
};

export default {
    install
};
