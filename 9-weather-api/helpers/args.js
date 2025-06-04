

const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;
    rest.forEach((value, index, array) => {
        if (value.charAt(0) == '-') {
            if (index == array.length - 1) {
                res[value.substring(1)] = true;
            } else if (array[index + 1].charAt(0) != '-') {
                res[value.substring(1)] = array[index + 1];
                // console.log(array)
                // console.log(value)
                // console.log(index + 1)
                res.s2 = array[index + 2];
                res.s3 = array[index + 3]; 
            } else {
                res[value.substring(1)] = true;
            }
        } else {
            res.lng = array[0];
        }
    });
    // console.log(res)
    return res;
};

export { getArgs }