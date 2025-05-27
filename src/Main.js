import Die from "./Die";

export default function Main () {
   return (
    <div className="body">
        <section >
            <main>
                <h1 className="title">Tenzies</h1>
                <p className="details">Roll until all dice are the same.
                   Click each die to freeze it at its current value between rolls.</p>
            </main>
        </section>
        <section className="boxes">
           <Die />
        </section>
    </div>
   )
}