const jogoDaVelha = {
    tabuleiro: ['', '', '', '', '', '', '', '', ''],
    simbolos: {
        opcoes: ['X', 'O'],
        turnoIndice: 0,
        mudarTurno: function () {
            this.turnoIndice = (this.turnoIndice === 0 ? 1 : 0)
        }
    },
    containerElemento: null,
    gameOver: false,
    sequenciasVencedoras: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    init: function (container) {
        this.containerElemento = container
    },
    jogada: function (posicao) {
        if (this.gameOver) return false;
        if (this.tabuleiro[posicao] === '') {
            this.tabuleiro[posicao] = this.simbolos.opcoes[this.simbolos.turnoIndice]
            this.mostrar();
            let indiceSequenciasVencedoras = this.checarSequenciasVencedoras(this.simbolos.opcoes[this.simbolos.turnoIndice])
            if (indiceSequenciasVencedoras >= 0) {
                this.fimDeJogo()
                this.estilizarVitória(this.sequenciasVencedoras[indiceSequenciasVencedoras])
            } else {
                this.simbolos.mudarTurno()
            }
            return true
        } else {
            return false
        }
    },
    fimDeJogo: function () {
        this.gameOver = true
    },
    iniciar: function () {
        this.tabuleiro.fill('')
        this.mostrar()
        this.gameOver = false
    },
    checarSequenciasVencedoras: function (simbolo) {
        for (i in this.sequenciasVencedoras) {
            if (this.tabuleiro[this.sequenciasVencedoras[i][0]] == simbolo &&
                this.tabuleiro[this.sequenciasVencedoras[i][1]] == simbolo &&
                this.tabuleiro[this.sequenciasVencedoras[i][2]] == simbolo) {
                return i
            }
        }
        return -1
    },
    estilizarVitória: function (sequenciasVencedoras) {
        sequenciasVencedoras.forEach(posicao => {
            this.containerElemento
                .querySelector(`div:nth-child(${posicao + 1})`)
                .classList.add('venceu');
        });
    },
    mostrar: function () {
        let conteudo = ''
        for (i in this.tabuleiro) {
            conteudo += '<div onclick="jogoDaVelha.jogada(' + i + ')">' + this.tabuleiro[i] + '</div>'
        }
        this.containerElemento.innerHTML = conteudo
    }
}