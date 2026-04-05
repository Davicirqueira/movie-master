import con from './connection.js';

export async function salvarFilme(filme){

    let comando = `
        INSERT INTO tb_filme (nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
			  VALUES (?, ?, ?, ?, ?);
    `

    let resp = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    let info = resp[0];

    let idFilme = info.insertId;
    return idFilme;

}


export async function consultarFilmes(nome){

    let comando = `
       SELECT id_filme      id,
	   nm_filme             nome,
       vl_avaliacao         avaliacao, 
       dt_lancamento        lancamento, 
       bt_disponivel        disponivel
       FROM tb_filme
       WHERE nm_filme like ?
    `

    let resp = await con.query(comando, ['%' + nome + '%']);
    let infosConsulta = resp[0];

    return infosConsulta;

}


export async function consultarFilmesId(id){

    let comando = `
       SELECT id_filme      id,
	   nm_filme             nome,
       ds_sinopse           sinopse,
       vl_avaliacao         avaliacao, 
       dt_lancamento        lancamento, 
       bt_disponivel        disponivel,
       img_filme            img
       FROM tb_filme
       WHERE id_filme = ?
    `

    let resp = await con.query(comando, [id]);
    let infosConsultaId = resp[0];

    return infosConsultaId;

}


//buscando filmes com mesmo nome para validação (salvarFilmeService.js)
export async function consultarFilmesNome(nome){

    let comando = `
       SELECT id_filme      id,
	   nm_filme             nome,
       vl_avaliacao         avaliacao, 
       dt_lancamento        lancamento, 
       bt_disponivel        disponivel
       FROM tb_filme
       WHERE nm_filme = ?
    `

    let resp = await con.query(comando, [nome]);
    let infosConsulta = resp[0];

    return infosConsulta;

}


export async function editarFilme(filme, id) {

    const comando = `
    
        UPDATE tb_filme
        SET nm_filme = ?,
        ds_sinopse = ?, 
        vl_avaliacao = ?, 
        dt_lancamento = ?, 
        bt_disponivel = ?
        WHERE id_filme = ?;

    `;

    let resp = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, 
    filme.disponivel, id]);

    let info = resp[0];

    let linhasAfetadas = info.affectedRows;

    return linhasAfetadas;

}


export async function excluirFilme(id) {

    const comando = `
    
        DELETE FROM tb_filme WHERE id_filme = ?;

    `;

    let resp = await con.query(comando, [id]);

    let info = resp[0];

    let linhasAfetadas = info.affectedRows;

    return linhasAfetadas;

}


export async function uploadImg(id, caminho){

    let comando = `
        
        UPDATE tb_filme
        SET img_filme = ? 
        WHERE id_filme = ?              
    
    `
 
    let resp = await con.query(comando, [caminho, id]);

    let info = resp[0];

    let linhasAfetadas = info.affectedRows;

    return linhasAfetadas;

}