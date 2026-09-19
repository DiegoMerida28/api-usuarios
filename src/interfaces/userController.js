class UserController {

    constructor(userService) {
        this.userService = userService;
    }


    // POST
    crearUsuario = async (req, res) => {

        try {

            const {
                nombre,
                email,
                password
            } = req.body;

            const usuario =
                await this.userService.crearUsuario(
                    nombre,
                    email,
                    password
                );

            res.status(201).json({
                mensaje:
                    'Usuario registrado correctamente',
                usuario
            });

        } catch (error) {

            res.status(400).json({
                mensaje: error.message
            });
        }
    };


    // GET
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


    // PUT
    modificarUsuario = async (req, res) => {

        try {

            const { id } = req.params;

            const {
                nombre,
                email,
                password
            } = req.body;

            const usuario =
                await this.userService.modificarUsuario(
                    id,
                    nombre,
                    email,
                    password
                );

            res.status(200).json({
                mensaje:
                    'Usuario modificado correctamente',
                usuario
            });

        } catch (error) {

            res.status(400).json({
                mensaje: error.message
            });
        }
    };


    // DELETE
    eliminarUsuario = async (req, res) => {

        try {

            const { id } = req.params;

            await this.userService.eliminarUsuario(id);

            res.status(200).json({
                mensaje:
                    'Usuario eliminado correctamente'
            });

        } catch (error) {

            res.status(400).json({
                mensaje: error.message
            });
        }
    };
}

module.exports = UserController;