import Fruit from "./Fruit";

export default function Fruits () {
    // const fruits = ["Apple", "Mango", "Banana"];

    const fruits = [
        { name: "Apple", price: 5, emoji: "🍎", soldout: true },
        { name: "Mango", price: 20, emoji: "🥭", soldout: false },
        { name: "Banana", price: 5, emoji: "🍌", soldout: true }   
    ]
    return (
       <div>
            <ul>
                {
                    fruits.map((fruit)=>(
                        // <li key={fruit}>{fruit.name} ${fruit.price} {fruit.emoji} </li>
                        <Fruit key={fruit.name} 
                        name={fruit.name} 
                        price={fruit.price} 
                        emoji={fruit.emoji}
                        soldout={fruit.soldout}/>
                    ))
                }
            </ul>
        </div>
    );
}