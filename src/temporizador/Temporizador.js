import React from 'react';
import './Temporizador.css';


class Temporizador extends React.Component {
    state = {
        horas: 0,
        minutes: 0,
        seconds: 5,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, horas } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes > 0) {

                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if (horas === 0) {
                        clearInterval(this.myInterval)
                    } else {
                        this.setState(({ horas }) => ({
                            horas: horas - 1,
                            minutes: 59,
                            seconds: 59,
                        }))
                    }
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { horas, minutes, seconds } = this.state
        return (
            <div className='Temporizador'>
                <div className='fundo'>
                    <div className='mostrador' >
                        {horas === 0 && minutes === 0 && seconds === 0
                            ? <h1 >Tempo Esgotado!</h1>
                            : <h1 >{horas}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                        }
                    </div>

                    <div className="botao">
                        <button>+</button>
                        <button>INICIAR</button>
                        <button>-</button>
                    </div>
                    
                </div>
            </div>

        )
    }
}
export default Temporizador;