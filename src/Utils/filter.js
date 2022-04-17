

const is = ({name, value}, records) => records.filter(record => record[name] === value);;


const contains = () => {

}



export const filterConfigObj = [{
    filterName: "Is",
    filterMethod: is
}, {
    filterName: "Contains",
    filterMethod: contains
}]
