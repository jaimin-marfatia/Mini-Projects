// Object of protos
const bookProtos = {
    getSummary: function () {
        return `${this.title} was written by ${this.author} in ${this.year}`;
    },
    getAge: function () {
        const years = new Date().getFullYear() - this.year;
        return `${this.title} is ${years} years old`;
    }
};

// Create object
// const book1 = Object.create(bookProtos);
// book1.title = 'Book One';
// book1.author = 'John';
// book1.year = '2018';

const book1 = Object.create(bookProtos, {
    title: {
        value: 'Book one'
    },
    author: {
        value: 'John'
    },
    year: {
        value: '2017'
    },
});

console.log(book1);