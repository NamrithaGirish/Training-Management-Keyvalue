// import { Request, Response, NextFunction } from "express";
// import { AssignmentService } from "../services/assignment.service";
// import HTTPException from "../exceptions/http.exception";
// import { plainToInstance } from "class-transformer";
// import { validate } from "class-validator";
// import { CreateAssignmentDto } from "../dto/assignment.dto";
// import LoggerService from "../services/logger.service";

// export class AssignmentController {
// 	private logger = LoggerService.getInstance(AssignmentService.name);

// 	constructor(private assignmentService: AssignmentService) {}
// 	async createAssignment(req: Request, res: Response, next: NextFunction) {
// 		const data = req.body;
// 		const createEmployeeDto = plainToInstance(CreateAssignmentDto, data);
// 		const err = await validate(createEmployeeDto);
// 		console.log("Error : ", err);
// 		if (err.length > 0) {
// 			console.log("Error : ", err);
// 			const errMsg = err.map((error) => {
// 				// console.log(
// 				// 	"validation error child : ",
// 				// 	Object.values(error.constraints)
// 				// );
// 				return error.constraints
// 					? Object.values(error.constraints).join(", ")
// 					: "";
// 			});
// 			this.logger.error("Create error : " + JSON.stringify(errMsg));
// 			throw new HTTPException(400, JSON.stringify(errMsg));
// 		}
// 		try {
// 			const assignment = await this.assignmentService.createAssignment(
// 				req.body
// 			);
// 			res.status(201).json(assignment);
// 		} catch (error) {
// 			next(error);
// 		}
// 	}

// 	async getAssignments(req: Request, res: Response, next: NextFunction) {
// 		try {
// 			const assignments = await this.assignmentService.getAssignments();
// 			res.status(200).json(assignments);
// 		} catch (error) {
// 			res.status(500).json({
// 				message: "Failed to fetch assignments",
// 				error,
// 			});
// 		}
// 	}

// 	async getAssignmentById(req: Request, res: Response, next: NextFunction) {
// 		try {
// 			const id: number = parseInt(req.params.id);
// 			const assignment = await this.assignmentService.getAssignmentById(
// 				id
// 			);
// 			if (!assignment) {
// 				throw new HTTPException(404, "Assignment not found");
// 			}
// 			res.status(200).json(assignment);
// 		} catch (error) {
// 			next(error);
// 		}
// 	}

// 	async updateAssignment(req: Request, res: Response, next: NextFunction) {
// 		try {
// 			const id: number = parseInt(req.params.id);
// 			const body = req.body;

// 			const updated = await this.assignmentService.updateAssignment(
// 				id,
// 				body
// 			);
// 			if (!updated) {
// 				return res
// 					.status(404)
// 					.json({ message: "Assignment not found" });
// 			}
// 			res.status(200).json(updated);
// 		} catch (error) {
// 			res.status(500).json({
// 				message: "Failed to update assignment",
// 				error,
// 			});
// 		}
// 	}

// 	async deleteAssignment(req: Request, res: Response, next: NextFunction) {
// 		try {
// 			const deleted = await this.assignmentService.deleteAssignment(
// 				req.params.id
// 			);
// 			if (!deleted) {
// 				return res
// 					.status(404)
// 					.json({ message: "Assignment not found" });
// 			}
// 			res.status(200).json({
// 				message: "Assignment deleted successfully",
// 			});
// 		} catch (error) {
// 			res.status(500).json({
// 				message: "Failed to delete assignment",
// 				error,
// 			});
// 		}
// 	}
// }
