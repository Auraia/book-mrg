const request = (arg, isReiect) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isReiect) {
                reject('new Error');
                return;
            }
            console.log(arg)
        }, 1000)
    });
}
const fn = async() => {
    const res = await request(10);
    console.log(res)
}