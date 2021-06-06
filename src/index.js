import "./style";
import { render } from "preact";
import { useState } from "preact/hooks";

const CARTYPES = [3, 3.5, 4];

const App = () => {
  const [carTypeIndex, setCarTypeIndex] = useState(0);
  const [distance, setDistance] = useState(100);
  const [speed1, setSpeed1] = useState(80);
  const [speed2, setSpeed2] = useState(60);

  const getConsumptionMultiplicator = (speed) => Math.pow(1.009, speed - 1);
  const prettyTime = (hours) => {
    if (hours <= 0 || !Number.isFinite(hours)) return "0min";
    const timestamp = hours * 60 * 60;
    var minutes = Math.floor(timestamp / 60) - Math.floor(hours) * 60;
    return (hours > 1 ? Math.floor(hours) + "h " : "") + minutes + "min";
  };

  const consumption1 =
    (distance / 100) *
    CARTYPES[carTypeIndex] *
    getConsumptionMultiplicator(speed1);

  const consumption2 =
    (distance / 100) *
    CARTYPES[carTypeIndex] *
    getConsumptionMultiplicator(speed2);

  const time1 = distance / speed1;
  const time2 = distance / speed2;

  return (
    <div class="consumptionForm">
      <h1>Autoilumittari </h1>
      <img
        class="carImage"
        src="https://koodihaaste.solidabis.com/asciicar_sansmokki.png"
        alt="auto"
      />
      <fieldset class="tui-input-fieldset">
        <legend>Auton kulutus</legend>
        <label class="tui-radio">
          &nbsp;&nbsp;&nbsp;Pienempi
          <input
            type="radio"
            name="radio"
            checked={carTypeIndex === 0 ? true : false}
            onChange={(_) => setCarTypeIndex(0)}
          />
          <span></span>
        </label>
        <label class="tui-radio">
          &nbsp;&nbsp;&nbsp;Keskitasoinen
          <input
            type="radio"
            name="radio"
            checked={carTypeIndex === 1 ? true : false}
            onChange={(_) => setCarTypeIndex(1)}
          />
          <span></span>
        </label>
        <label class="tui-radio">
          &nbsp;&nbsp;&nbsp;Isompi
          <input
            type="radio"
            name="radio"
            checked={carTypeIndex === 2 ? true : false}
            onChange={(_) => setCarTypeIndex(2)}
          />
          <span></span>
        </label>
      </fieldset>
      <br />
      Matka......:{" "}
      <input
        class="tui-input"
        type="number"
        value={distance}
        placeholder="0"
        onInput={(e) => setDistance(e.target.value)}
        onFocus={(e) => e.target.select()}
      />
      km
      <br />
      <br />
      Nopeus 1...:{" "}
      <input
        class="tui-input"
        type="number"
        value={speed1}
        placeholder="0"
        onInput={(e) => setSpeed1(e.target.value)}
        onFocus={(e) => e.target.select()}
      />
      km/h&nbsp;
      <br />
      <span class="">
        (
        {consumption1 > consumption2
          ? `+ ${(consumption1 - consumption2).toFixed(1)}l`
          : `+ ${prettyTime(time1 - time2)}`}
        )
      </span>
      <br />
      Nopeus 2...:{" "}
      <input
        class="tui-input"
        type="number"
        value={speed2}
        placeholder="0"
        onInput={(e) => setSpeed2(e.target.value)}
        onFocus={(e) => e.target.select()}
      />
      km/h&nbsp;
      <br />
      <span class="">
        (
        {consumption2 > consumption1
          ? `+ ${(consumption2 - consumption1).toFixed(1)}l`
          : `+ ${prettyTime(time2 - time1)}`}
        )
      </span>
      <br />
      <br />
      <span class="tui-divider white-255-border"></span>
      <br />
      <br />
      <div class="cyan-168">
        <fieldset class="tui-input-fieldset">
          <legend>Tulokset</legend>
          <table class="tui-table" style="min-width: 100%">
            <thead>
              <tr>
                <th>Nopeus</th>
                <th>Aika</th>
                <th>Kulutus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{speed1}km/h</td>
                <td>{prettyTime(time1)}</td>
                <td>{consumption1.toFixed(1)}l</td>
              </tr>
              <tr>
                <td>{speed2}km/h</td>
                <td>{prettyTime(time2)}</td>
                <td>{consumption2.toFixed(1)}l</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  );
};

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("app"));
}
