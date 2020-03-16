
angular.module('myApp', []).controller('Contacts', function ($scope, $http) {
    $scope.pesquisa = "";

    $scope.novo = function () {
        $scope.contatoDto = {
            name: null,
            email: null,
            phone: null,
            link: null
        };
    }

    function atualizarListagem() {
        $scope.novo();
        $http.get('http://localhost:8080/contacts/').
                then(function (response) {
                    var retorno = response.data;
                    $scope.contacts = retorno._embedded.contacts;
                });
    }

    $scope.gravar = function (formValido) {
        if (!formValido) {
            alert('Erro ao gravar seu contato. Verifique se preencheu os campos corretamente.');
            return false;
        }

        if ($scope.contatoDto.link == null) {
            return $http.post('http://localhost:8080/contacts/', $scope.contatoDto).success(function (data, status, headers, config) {
                atualizarListagem();
                document.getElementById('collapseBtn').click();
            });
        } else {
            return $http.put($scope.contatoDto.link, $scope.contatoDto).success(function (data, status, headers, config) {
                atualizarListagem();
                document.getElementById('collapseBtn').click();
            });
        }
    }

    $scope.editar = function (contato) {
        $scope.contatoDto.name = contato.name;
        $scope.contatoDto.email = contato.email;
        $scope.contatoDto.phone = contato.phone;
        $scope.contatoDto.link = contato._links.self.href;
    }

    $scope.excluir = function (nome, link) {
        if (confirm("Deseja realmente excluir \"" + nome + "\"?")) {
            return $http.delete(link).success(function (data, status, headers, config) {
                atualizarListagem();
            });
        }
    }

    atualizarListagem();

});