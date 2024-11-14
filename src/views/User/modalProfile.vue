<template>
    <div class="modal fade modal-lg" id="perfilModal" tabindex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text" id="perfilModalLabel">Meu Perfil</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text">
                    <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Dados Pessoais</h5>
                    <div class="d-flex justify-content-center align-items-center flex-column">
                        <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px;">
                        <div class="col-md-6 mb-4">
                            <input type="file" class="form-control" id="imagem">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="name" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="name" placeholder="Seu nome">
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" placeholder="Seu e-mail">
                        </div>
                        <div class="col-md-4">
                            <label for="phone" class="form-label">Telefone</label>
                            <input type="tel" class="form-control" id="phone" placeholder="Seu telefone">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="cpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpf" placeholder="Seu CPF">
                        </div>
                        <div class="col-md-6">
                            <label for="birthDay" class="form-label">Data de Nascimento</label>
                            <input type="date" class="form-control" id="birthDay">
                        </div>
                    </div>

                    <hr>

                    <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Meu Endereço</h5>
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" placeholder="Seu endereço">
                        </div>
                        <div class="col-md-4">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" class="form-control" id="cidade" placeholder="Sua cidade">
                        </div>
                        <div class="col-md-4">
                            <label for="estado" class="form-label">Estado</label>
                            <input type="text" class="form-control" id="estado" placeholder="Seu estado">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="pai" class="form-label">Nome do Pai</label>
                            <input type="text" class="form-control" id="pai" placeholder="Nome do seu pai">
                        </div>
                        <div class="col-md-4">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="cep" placeholder="Seu CEP">
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>
</template>
