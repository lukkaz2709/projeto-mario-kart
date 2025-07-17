const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random =Math.random();
    let result;

    switch (true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            default:
            result = "CONFRONTO";
}
    return result;
    
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
        `${characterName} 🎲 rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}.`
    );
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Rodada ${round} iniciada!`);

        //sortear o bloco
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        //rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let TotalSkillTest1 = 0;
    let TotalSkillTest2 = 0;

    if(block === "RETA") {
        TotalSkillTest1 = character1.VELOCIDADE + diceResult1;
        TotalSkillTest2 = character2.VELOCIDADE + diceResult2;

        await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
        await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    }

    if(block === "CURVA") {
        TotalSkillTest1 = character1.MANOBRABILIDADE + diceResult1;
        TotalSkillTest2 = character2.MANOBRABILIDADE + diceResult2;

        await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
        await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }

    if(block === "CONFRONTO") {
        let powerResult1 = character1.PODER + diceResult1;
        let powerResult2 = character2.PODER + diceResult2;

        console.log(`${character1.NOME} confrontou com  ${character2.NOME}! 🥊`);
        await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
        await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

        // Função para sortear penalidade
        function sorteiaPenalidade() {
            return Math.random() < 0.5 ? { tipo: "casco", valor: 1 } : { tipo: "bomba", valor: 2 };
        }
        // Função para sortear turbo
        function sorteiaTurbo() {
            return Math.random() < 0.5; // 50% de chance de ganhar turbo
        }

        if(powerResult1 > powerResult2 && character2.PONTOS > 0){
            const penalidade = sorteiaPenalidade();
            character2.PONTOS -= penalidade.valor;
            if(character2.PONTOS < 0) character2.PONTOS = 0;
            console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} levou um ${penalidade.tipo.toUpperCase()} e perdeu ${penalidade.valor} ponto(s)! 🐢💣`);
            if(sorteiaTurbo()) {
                character1.PONTOS++;
                console.log(`${character1.NOME} ganhou um TURBO! (+1 ponto) 🚀`);
            }
        }

        if(powerResult2 > powerResult1 && character1.PONTOS > 0){
            const penalidade = sorteiaPenalidade();
            character1.PONTOS -= penalidade.valor;
            if(character1.PONTOS < 0) character1.PONTOS = 0;
            console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} levou um ${penalidade.tipo.toUpperCase()} e perdeu ${penalidade.valor} ponto(s)! 🐢💣`);
            if(sorteiaTurbo()) {
                character2.PONTOS++;
                console.log(`${character2.NOME} ganhou um TURBO! (+1 ponto) 🚀`);
            }
        }
                 
        console.log(powerResult2 === powerResult1 ? "Empate no confronto! Nenhum ponto foi perdido." : "");
    }

    //verificar quem ganhou o teste de habilidade
    if(TotalSkillTest1 > TotalSkillTest2) {
        character1.PONTOS ++;
        console.log(`${character1.NOME} Marcou um ponto!`);
    }else if(TotalSkillTest2 > TotalSkillTest1) {
        character2.PONTOS ++;
        console.log(`${character2.NOME} Marcou um ponto!`);
    }

    console.log("-------------------------------------------")
 }
  
}

async function declareWinner(character1, character2) {
    console.log("Resultado Final:")  
    console.log(`${character1.NOME} - Pontos: ${character1.PONTOS}`);
    console.log(`${character2.NOME} - Pontos: ${character2.PONTOS}`);
    
    if(character1.PONTOS > character2.PONTOS) 
        console.log(`${character1.NOME} é o grande vencedor! 🏆`);
     else if(character2.PONTOS > character1.PONTOS) 
        console.log(`${character2.NOME} é o grande vencedor! 🏆`);
     else 
        console.log("A corrida terminou em empate! 🤝");
    
}
(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`
    );
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
    console.log("🏁🚨 Corrida finalizada! 🏁🚨");
})();

