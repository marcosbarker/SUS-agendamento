class Agendar {  

    constructor(name, cpf, carteira, endereco, sexo, nascimento, tel, ubs, especialidades, doutor, data,){
        this.name = name
        this.cpf = cpf
        this.carteira = carteira
        this.endereco = endereco
        this.sexo = sexo
        this.nascimento = nascimento
        this.tel = tel
        this.ubs = ubs
        this.especialidades = especialidades
        this.doutor = doutor
        this.data = data          
    }

    validarDados(){ 
        for(let i in this){ 
            if (this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }           
        }
        return true
    }    
}
// CRIA BD
class Bd { 
    //cria id
    constructor(){ 
        let id = localStorage.getItem('id') 
        if (id === null){
            localStorage.setItem('id', 0) 
        }
    }

    //gera id para itens no localStorage
    getProximoId(){ 
        let proximoId = localStorage.getItem('id')
            return parseInt(proximoId) + 1
    }

    gravar(a) {
        let id = this.getProximoId() 
        //converte objeto para string
        localStorage.setItem(id, JSON.stringify(a)) 
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() { 
        let agendamento = Array()
        //faz requisição do agendamento
        let id = localStorage.getItem('id')
        for(let i = 1; i <= id; i++){
            let agenda = JSON.parse(localStorage.getItem(i))
            if(agenda == null){
                continue
            }
            agenda.id = i 
            agendamento.push(agenda)
        }
        return agendamento    
    }

    //filtro
    pesquisar(encontrar){  
        let agendamentoFiltrado = Array()
        agendamentoFiltrado = this.recuperarTodosRegistros()

        if (encontrar.name != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.name == encontrar.name)
        }
        
        if (encontrar.cpf != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.cpf == encontrar.cpf)
        }

        if (encontrar.carteira != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.carteira == encontrar.carteira)
        }

        if (encontrar.endereco != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.endereco == encontrar.endereco)
        }

        if (encontrar.sexo != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.sexo == encontrar.sexo)
        }

        if (encontrar.nascimento != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.nascimento == encontrar.nascimento)
        }

        if (encontrar.tel != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.tel == encontrar.tel)
        }

        if (encontrar.ubs != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.ubs == encontrar.ubs)
        }

        if (encontrar.especialidades != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.especialidades == encontrar.especialidades)
        }

        if (encontrar.doutor != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.doutor == encontrar.doutor)
        }

        if (encontrar.data != ''){
            agendamentoFiltrado = agendamentoFiltrado.filter(a => a.data == encontrar.data)
        }

        return agendamentoFiltrado
    }

    //modal exlui agendamento
    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarAgendamento(){  //1º passo
   
    let name = document.getElementById('name')  
    let cpf = document.getElementById('cpf')
    let carteira = document.getElementById('carteira')
    let endereco = document.getElementById('endereco')
    let sexo = document.getElementById('sexo')
    let nascimento = document.getElementById('nascimento')
    let tel = document.getElementById('tel')
    let ubs = document.getElementById('ubs')
    let especialidades = document.getElementById('especialidades')
    let doutor = document.getElementById('doutor')
    let data = document.getElementById('data')    

    let agendar = new Agendar( 
        name.value,
        cpf.value,
        carteira.value, 
        endereco.value, 
        sexo.value, 
        nascimento.value, 
        tel.value, 
        ubs.value, 
        especialidades.value, 
        doutor.value, 
        data.value
    )

    
    if (agendar.validarDados()){ 
        bd.gravar(agendar)

        document.getElementById('modal_titulo_div').className = 'modal-header text-success'

        document.getElementById('modal_titulo').innerHTML = 'Cadastrado com Sucesso!'

        document.getElementById('modal_conteudo').innerHTML = 'Não esqueça de levar a carteirinha do SUS no dia da consulta'

        document.getElementById('modal_btn').innerHTML = 'Confirma'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#modalRegistraAgendamento').modal('show')

        name.value = ''
        cpf.value = ''
        carteira.value = '' 
        endereco.value = '' 
        sexo.value = ''
        nascimento.value = ''
        tel.value = ''
        plano.value = ''
        especialidades.value = ''
        doutor.value = ''
        data.value = ''

    } else {

        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'

        document.getElementById('modal_titulo').innerHTML = 'Todos os campos são obrigatórios'

        document.getElementById('modal_conteudo').innerHTML = 'Preencha todos os dados corretamente.'

        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-danger'


        $('#modalRegistraAgendamento').modal('show')
    }
}

function carregaListaAgendamento( pesquisar = Array(), filtro = false ){   
      
    if (pesquisar.length == 0 && filtro == false){
        pesquisar = bd.recuperarTodosRegistros()
    }

    let listaAgendamento = document.getElementById('listaAgendamento') 
    listaAgendamento.innerHTML = ''
    
    //CRIA ESTRUTURA DO BD linhas e colunas
    pesquisar.forEach(function(a){
        let linha = listaAgendamento.insertRow()

        linha.insertCell(0).innerHTML = a.name
        linha.insertCell(1).innerHTML = a.cpf
        linha.insertCell(2).innerHTML = a.carteira
        linha.insertCell(3).innerHTML = a.endereco

        switch (a.sexo){
            case '1': a.sexo = 'Feminino'
                break
            case '2': a.sexo = 'Masculino' 
                break                
            case '3': a.sexo = 'Prefiro não informar'
                break 
        }

        linha.insertCell(4).innerHTML = a.sexo
        let nasc_1  = new Date(a.nascimento).toLocaleDateString('pt-br')
        linha.insertCell(5).innerHTML = nasc_1
        linha.insertCell(6).innerHTML = a.tel

        switch (a.ubs){
            case '1': a.ubs = 'UBS Alto Independência'
                break
            case '2': a.ubs = 'UBS Morin' 
                break                
            case '3': a.ubs = 'UBS Mosela'
                break
            case '4': a.ubs = 'UBS Quitandinha'
                break      
        }
        linha.insertCell(7).innerHTML = a.ubs

        switch (a.especialidades){
            case '1': a.especialidades = 'Atendimento Clínico'
                break
            case '2': a.especialidades = 'Atendimento pediátrico' 
                break                
            case '3': a.especialidades = 'Saúde Bucal'
                break                 
        }
        linha.insertCell(8).innerHTML = a.especialidades

        switch (a.doutor){
            case '1': a.doutor = 'Dr.  Emerson de Souza'
                break
            case '2': a.doutor = 'Dr.  João Victor Rodrigues' 
                break                
            case '3': a.doutor = 'Drª. Jéssica Coutinho de Mattos'
                break
            case '4': a.doutor = 'Drª. Ana Carolina M Corrêa'
                break 
            case '5': a.doutor = 'Drª. Larissa Marques'
                break                
        }
 
        linha.insertCell(9).innerHTML = a.doutor
        let data_a  = new Date(a.data).toLocaleDateString('pt-br')
        linha.insertCell(10).innerHTML = data_a

        //botao de exluir modal
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa fa-trash"></i>'
        btn.id = `id_despesa_${a.id}`
        btn.onclick = function (){ 
            let id = this.id.replace('id_despesa_', '')                   
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
            document.getElementById('modal_titulo').innerHTML = 'Exclusão de agendamento!'
            document.getElementById('modal_conteudo').innerHTML = 'Deseja excluir esse agendamento de forma permanente?'
            document.getElementById('modal_btn').innerHTML = 'Excluir'           
            document.getElementById('modal_btn').className = 'btn btn-danger' 

            $('#modalExclusaoAgendamento').modal('show')            
                           
            bd.remover(id)        
        }     
        
        linha.insertCell(11).append(btn) 
    })    
}