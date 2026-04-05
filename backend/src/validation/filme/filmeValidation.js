
export function validarCamposObrigatorios(filmeObj){

    if(!filmeObj.nome)
        throw new Error('Informe o nome do filme.');

    if(!filmeObj.sinopse)
        throw new Error('Informe a sinopse do filme.');

    if(!filmeObj.avaliacao)
        throw new Error('Informe a avaliação do filme');

    if(isNaN(filmeObj.avaliacao))
        throw new Error('Avaliação inválida');

    if(!filmeObj.lancamento)
        throw new Error('Informe a data de lançamento.');

    if(filmeObj.disponivel == undefined)
        throw new Error('Informe se o filme está disponível.');    

}


export function validarFilmeUnico(infosConsulta){

    if(infosConsulta.length == 0)
        throw new Error('Filme não encontrado.');

}


export function validarFilmeIgual(infosConsulta){

    if(infosConsulta.length > 0)
        throw new Error('Já existe filme com esse nome.')

}


export function validarEdicao(linhasAfetadas){

    if(linhasAfetadas == 0)
        throw new Error('Nenhum filme alterado.');

}


export function validarExclusao(linhasAfetadas){

    if(linhasAfetadas == 0)
        throw new Error('Nenhum filme excluído.');

}