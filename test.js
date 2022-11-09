// const people = [{id:1, name:"John"}, {id:2, name:"Alice"}];
// const address = [{id:1, peopleId: 1, address: 'Some street 1'}, {id:2, peopleId: 2, address: 'Some street 2'}]

// let op = people.map((e,i)=>{
//   let temp = address.find(element=> element.id === e.id)
//   if(temp.address) {
//     e.address = temp.address;
//   }
//   return e;
// })
// console.log(op);
// const mydata = [{id:2,mobile:9876543222},{id:2,mobile:9876543212},{id:3,mobile:9844541222}]
// const responses = [{mobile:9876543222,response:'BJP'},{mobile:9876543212,response:'AAP'},{mobile:9844541222,response:'others'},
// {mobile:9876543222,response:'BJP'},{mobile:9876543212,response:'BJP'},{mobile:9876541222,response:'AAP'}]


// let op = mydata.map((e,i)=>{
//     let temp = responses.filter(element=> element.mobile == e.mobile);

//     if (temp){
//         e.responses = temp
        
//     }
//     return e
// })

// console.log(op[0])


const data = [[1,2],[3,4],[5,6]]


const combine = data.reduce((total,currentvalue)=>{

    return total.concat(currentvalue)

},[])

console.log(combine)






















