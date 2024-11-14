<template>
    <div class="row">
        <div class="col-8">
            <h1 class="text topic">Cursos</h1>
        
            <div class="row mt-5">
                <!-- Cards (Lado a Lado) -->
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
                    <div class="card" style="width: 100%;">
                        <img src="/images/Home/notebook.png" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
        
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
                <div class="card" style="width: 100%;">
                    <img src="/images/Home/notebook.png" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>
        
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
                <div class="card" style="width: 100%;">
                    <img src="/images/Home/notebook.png" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>
            </div>
    
            <div class="row mt-5">
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
                    <div class="card" style="width: 100%;">
                        <img src="/images/Home/notebook.png" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
    
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
                    <div class="card" style="width: 100%;">
                        <img src="/images/Home/notebook.png" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
    
                <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 d-flex justify-content-center">
                    <div class="card" style="width: 100%;">
                        <img src="/images/Home/notebook.png" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
        <div class="col-3 mt-5">
            <h4 class="text-dark">Filtro de Cursos</h4>

            <form class="mt-4">
                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="symfony" id="symfony">
                    <label class="form-check-label text" for="symfony">
                        Symfony
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="laravel" id="laravel">
                    <label class="form-check-label text" for="laravel">
                        Laravel
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="php" id="php">
                    <label class="form-check-label text" for="php">
                        PHP
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="lumen" id="lumen">
                    <label class="form-check-label text" for="lumen">
                        Lumen
                    </label>
                </div>

                <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" value="all" id="all">
                    <label class="form-check-label text" for="all">
                        Todos
                    </label>
                </div>
                <h5 class="text-dark mt-4">Preço</h5>

                <div class="">
                    <div class="form-group">
                        <label for="priceRange" class="form-label">Preço</label>
                        <input type="range" class="form-range" id="priceRange" min="0" max="1000" step="10" value="500">
                        <div class="d-flex justify-content-between">
                            <span id="priceMin" class="text">R$ 0</span>
                            <span id="currentPrice" class="text">R$ 500</span>
                            <span id="priceMax" class="text">R$ 1000</span>
                        </div>
                    </div>
                </div>

            </form>

            <h4 class="text-dark mt-4">Professores</h4>

            <div class="mt-4">
            <div class="card mt-3" style="width: 18rem;">
                <div class="d-flex justify-content-center mt-3">
                    <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
                </div>
                <div class="card-body text-center">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <small class="card-text emphasis">20 cursos</small>
                </div>
            </div>

            <div class="card mt-3" style="width: 18rem;">
                <div class="d-flex justify-content-center mt-3">
                    <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
                </div>
                <div class="card-body text-center">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <small class="card-text emphasis">20 cursos</small>
                </div>
            </div>

            <div class="card mt-3" style="width: 18rem;">
                <div class="d-flex justify-content-center mt-3">
                    <img src="https://via.placeholder.com/50" alt="User" class="img-fluid rounded-circle" style="width: 80px; height: 80px;">
                </div>
                <div class="card-body text-center">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <small class="card-text emphasis">20 cursos</small>
                </div>
            </div>
        </div>

        </div>

    </div>
 </template>
 