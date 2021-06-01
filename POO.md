abstract(não pode ser chamado diretamente) class POO-Objeto {
    nomeDoAtributo1:tipo ex:numero ou string
    privado nomeDoAtributo2:tipo = dadoEstatico

    #chama para organizar a ordem dos atributos
    construtor(nomeDoParametro2:tipo){
        this.nomeDoAtributo1 = nomesDoParametro2
    }

    methodo( parametro ) {

    }
}

#chama instanciar o evento de co
const variavel = new POO(nomeDoParametro2)

#Interface
interface nomeDaClasse { //Contrato(Requisitos), as obrigações
    atributoObrigatorio:tipagem
    metrohodoObrigatorio()
}

class nomeDaClasse2 implements nomeDaClasse { // Chama os requisitos minimos

}