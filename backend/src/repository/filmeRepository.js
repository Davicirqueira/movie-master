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