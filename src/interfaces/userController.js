class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    crearUsuario = async (req, res) => {
        try {
            const { nombre, email, password } = req.body;

            const usuario =
                await this.userService.crearUsuario(
                    nombre,
                    email,
                    password
                );

            res.status(201).json({
                mensaje: 'Usuario registrado correctamente',
                usuario
            });

        } catch (error) {
            res.status(400).json({
                mensaje: error.message
            });
        }
    };


    obtenerUsuarios = async (req, res) => {
        try {
            const usuarios =
                await this.userService.obtenerUsuarios();

            res.status(200).json(usuarios);

        } catch (error) {
            res.status(500).json({
                mensaje: error.message
            });
        }
    };


    actualizarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, email } = req.body;

            const usuario =
                await this.userService.actualizarUsuario(
                    id,
                    nombre,
                    email
                );

            res.status(200).json({
                mensaje: 'Usuario actualizado correctamente',
                usuario
            });

        } catch (error) {
            res.status(400).json({
                mensaje: error.message
            });
        }
    };


    eliminarUsuario = async (req, res) => {
        try {
            const { id } = req.params;

            const resultado =
                await this.userService.eliminarUsuario(id);

            res.status(200).json(resultado);

        } catch (error) {
            res.status(400).json({
                mensaje: error.message
            });
        }
    };
}

module.exports = UserController;