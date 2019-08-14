import {observable} from 'mobx';

class ExampleStore {
    constructor(props) {
        console.log('props :->', props);
    }

    @observable name = 'test';
}

export default ExampleStore;