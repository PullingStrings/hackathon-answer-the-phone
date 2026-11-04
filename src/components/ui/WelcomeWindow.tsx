type Props = { onStart: () => void };
export default function WelcomeWindow({ onStart }: Props) {
  return (
    <div className="welcome">
      <img className="welcome__computer" src="/images/1996/desktop-computer.svg" alt="" />
      <h1>
        WELCOME BACK.
        <br />
        IT'S 1996.
      </h1>
      <p>Your time capsule is almost ready.</p>
      <p>
        Capture your memory,
        <br />
        predict the future, set your soundtrack.
      </p>
      <button type="button" className="retro-button welcome__action" onClick={onStart}>
        Let's Go!
      </button>
    </div>
  );
}
