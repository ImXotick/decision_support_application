import { NavLink } from "react-router";
import { liText } from "../constants";
import Button from "../components/ui/button";

const Home = () => {
  return (
    <main className="w-full flex flex-col">
      <section className="w-full min-h-[380px] flex flex-col items-center justify-center bg-surface p-16">
        <h1 className="flex font-semibold text-4xl pb-5 md:text-6xl">
          Make better decisions
        </h1>
        <h2 className="flex flex-wrap font-semibold text-2xl text-black/60 md:text-4xl">
          Make better investment decisions with our app
        </h2>
      </section>
      <section className="w-full flex items-center justify-evenly bg-onBackground p-16 md:flex-row flex-col">
        <div className="flex flex-col items-center justify-center text-justify">
          <ol className="list-decimal p-10 text-white text-justify">
            {liText.map((text, index) => (
              <li key={index} className="py-1">
                {text}
              </li>
            ))}
          </ol>
        </div>
        <img src="/images/models.png" alt="models" className="h-80 w-80" />
      </section>
      <section className="w-full min-h-[380px] flex flex-col items-center justify-center bg-surface p-16">
        <h1 className="flex flex-wrap font-semibold text-4xl pb-10 md:text-6xl">
          Try our models.
        </h1>
        <NavLink to="/models">
          <Button variant="ghost">Check Decision Models</Button>
        </NavLink>
      </section>
    </main>
  );
};

export default Home;
