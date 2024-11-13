
class Email {

    private value: string;

    constructor (email: string) {
        if (!email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) {
            throw new Error('Email inválido.');
        }

        this.value = email;
    }

    getValue() {
        return this.value;
    }

}

export { Email }